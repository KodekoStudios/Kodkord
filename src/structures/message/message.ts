import type { APIMessage } from "discord-api-types/v10";
import { BaseMessage } from "./base.message";

export class Message extends BaseMessage<APIMessage> {}
