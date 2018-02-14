/*
 * Copyright (C)  2018  Gianni Bombelli & Emanuele Mantovani @ Intré S.r.l.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import {v4 as uuidV4} from 'uuid';
import {wsPayloadEnum} from '../enum/ws-payload.enum';
import {User} from './user';

export class WsMessage {
  private _id: string;
  private _user: User;
  private _timestamp: number;
  private _payloadType: wsPayloadEnum;
  private _payload: any;
  private _rawPayload: any;

  get id(): string {
    return this._id;
  }

  get user(): User {
    return this._user;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get payloadType(): wsPayloadEnum {
    return this._payloadType;
  }

  get payload(): any {
    return this._payload;
  }

  set payload(value: any) {
    this._payload = value;
  }

  get rawPayload(): any {
    return this._rawPayload;
  }

  get userEmail(): string {
    return this._user.email;
  }

  get userColor(): string {
    return this._user.uiConfig.color;
  }

  get userImage(): string {
    return this._user.uiConfig.image;
  }

  public static parseWsMessage(data: string): WsMessage {
    const message = JSON.parse(data) as WsMessage;
    const wsMessage = new WsMessage();
    wsMessage._id = message._id;
    wsMessage._user = User.buildFromObject(message._user);
    wsMessage._timestamp = message._timestamp;
    wsMessage._payloadType = message._payloadType;
    wsMessage._rawPayload = message._rawPayload ? message._rawPayload : message._payload;
    return wsMessage;
  }

  public static build(user: User, payloadType: wsPayloadEnum, payload: any): WsMessage {
    const wsMessage = new WsMessage();
    wsMessage._id = uuidV4();
    wsMessage._user = user;
    wsMessage._timestamp = Date.now();
    wsMessage._payloadType = payloadType;
    wsMessage._payload = payload;
    return wsMessage;
  }
}

