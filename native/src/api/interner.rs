use once_cell::sync::Lazy;
use rustc_hash::FxHashSet;
use tokio::sync::RwLock;

/// A concurrent string interner that yields `&'static str` for any input string.
///
/// Internally maintains a `FxHashSet<&'static str>` protected by an async
/// `RwLock` so that:
/// 1. Multiple tasks can read from the set concurrently.
/// 2. Only one task at a time can insert a new string.
///
/// Once a string is interned, its backing `Box<str>` is leaked,
/// guaranteeing a `&'static str` for the lifetime of the program.
#[derive(Default)]
pub struct Interner {
    /// Set of all interned static string references.
    set: RwLock<FxHashSet<&'static str>>,
}

impl Interner {
    /// Interns the given string slice, returning a `&'static str` that
    /// will remain valid for the remainder of the program.
    ///
    /// # Steps
    /// 1. Acquire a **read** lock to check if `s` is already present.
    /// 2. If found, return the existing interned reference.
    /// 3. Release the read lock, then acquire a **write** lock to insert.
    /// 4. Double-check presence to avoid race conditions.
    /// 5. Box and leak the string to obtain a stable `'static` reference.
    /// 6. Insert into the set and return it.
    ///
    /// # Arguments
    /// * `s` - The string slice to intern.
    ///
    /// # Returns
    /// A `&'static str` pointing to the interned string.
    pub async fn intern(&self, s: &str) -> &'static str {
        // 1. Check with a read lock
        let set_read = self.set.read().await;
        if let Some(&existing) = set_read.get(s) {
            return existing;
        }

        // Explicitly drop the read guard before taking a write lock
        drop(set_read);

        // 2. Acquire write lock to perform insertion
        let mut set_write = self.set.write().await;
        
        // Double-check to avoid duplicate inserts
        if let Some(&existing) = set_write.get(s) {
            return existing;
        }

        // 3. Box the string data to own it, then leak for `'static` lifetime
        let boxed: Box<str> = s.into();
        let leaked: &'static str = Box::leak(boxed);

        // 4. Insert the leaked reference and return
        set_write.insert(leaked);
        leaked
    }
}

/// A global, lazily-initialized interner for easy reuse across the crate.
///
/// Use `INTERNER.intern("foo").await` to intern strings without manually
/// creating an `Interner` instance.
pub static INTERNER: Lazy<Interner> = Lazy::new(Interner::default);
