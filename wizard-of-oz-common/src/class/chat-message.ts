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

import {ChatMessageButton} from '../interface/chat-message-button';

export interface IChatMessage {
  readonly message: string;
  readonly board?: string;
  readonly buttons?: ChatMessageButton[];
}

export class ChatMessage implements IChatMessage {
  public static readonly messageRegExp = new RegExp('^(#([\\w\\d]+):)?\\s?([\\w\\W]+)$');

  readonly message: string;
  readonly board?: string;
  readonly buttons?: ChatMessageButton[];


  constructor(message: string, board?: string, buttons?: ChatMessageButton[]) {
    const regExpMatches = ChatMessage.messageRegExp.exec(message);
    this.message = regExpMatches ? regExpMatches[3] : message;
    this.board = board ? board : (regExpMatches ? regExpMatches[2] : undefined);
    this.buttons = buttons;
  }

}
