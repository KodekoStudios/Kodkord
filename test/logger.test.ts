import { GatewayDispatchEvents, GatewayOpcodes, type GatewayReadyDispatchData, type GatewayReceivePayload } from "discord-api-types/v10";
import { describe, it, expect } from "bun:test";
import { Logger } from "../src/common/logger";

describe("Logger", () => {
    it("It should do something idk :3", () => {
        const logger = new Logger({ from: "WEB SOCKET" });

        const payload: GatewayReceivePayload = {
            op: GatewayOpcodes.Dispatch,
            d: {} as GatewayReadyDispatchData,
            t: GatewayDispatchEvents.Ready,
            s: 1
        };

        logger.debug(`Received Event {italic:${payload.t}}`, JSON.stringify(payload, null, 2))
        logger.debug(`Received Event {underline:${payload.t}}`, JSON.stringify(payload, null, 2))

        expect(true).toBe(true);
    });
})