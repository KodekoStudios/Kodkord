import { ChannelType } from "discord-api-types/v10";
import { bench, run, summary } from "mitata";

summary(() => {
    const type = ChannelType.GuildForum as ChannelType;

    bench("Switch", () => {
        switch (type) {
            case ChannelType.GuildText:
            case ChannelType.DM:
            case ChannelType.GuildVoice:
            case ChannelType.GroupDM:
            case ChannelType.GuildCategory:
            case ChannelType.GuildAnnouncement:
            case ChannelType.PublicThread:
            case ChannelType.AnnouncementThread:
            case ChannelType.PrivateThread:
            case ChannelType.GuildStageVoice:
            case ChannelType.GuildDirectory:
            case ChannelType.GuildForum:
            case ChannelType.GuildMedia:
                type.toString();
                break;

            default:
                break;
        }
    });

    const record: Record<ChannelType, (type: ChannelType) => void> = {
        [ChannelType.GuildText]: (type: ChannelType) => { type.toString(); },
        [ChannelType.DM]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildVoice]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GroupDM]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildCategory]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildAnnouncement]: (type: ChannelType) => { type.toString(); },
        [ChannelType.PublicThread]: (type: ChannelType) => { type.toString(); },
        [ChannelType.AnnouncementThread]: (type: ChannelType) => { type.toString(); },
        [ChannelType.PrivateThread]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildStageVoice]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildDirectory]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildForum]: (type: ChannelType) => { type.toString(); },
        [ChannelType.GuildMedia]: (type: ChannelType) => { type.toString(); },
    };
    
    bench("Object", () => {
        return record[type]?.(type);
    });
});

await run();