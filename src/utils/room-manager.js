// import { ROOM_TYPES } from "./socket-constants.js";

// export class RoomManager {
//   /**
//    * Join a specific room
//    */
//   static joinRoom(socket, roomId, roomType = ROOM_TYPES.BOSS_FIGHT) {
//     const roomName = `${roomType}_${roomId}`;
//     socket.join(roomName);
//     console.log(`Socket ${socket.id} joined room: ${roomName}`);
//     return roomName;
//   }

//   /**
//    * Leave a specific room
//    */
//   static leaveRoom(socket, roomId, roomType = ROOM_TYPES.BOSS_FIGHT) {
//     const roomName = `${roomType}_${roomId}`;
//     socket.leave(roomName);
//     console.log(`Socket ${socket.id} left room: ${roomName}`);
//     return roomName;
//   }

//   /**
//    * Broadcast to all sockets in a room
//    */
//   static broadcastToRoom(
//     io,
//     roomId,
//     event,
//     data,
//     roomType = ROOM_TYPES.BOSS_FIGHT
//   ) {
//     const roomName = `${roomType}_${roomId}`;
//     io.to(roomName).emit(event, data);
//   }

//   /**
//    * Broadcast to all sockets in a room except sender
//    */
//   static broadcastToRoomExcept(
//     socket,
//     roomId,
//     event,
//     data,
//     roomType = ROOM_TYPES.BOSS_FIGHT
//   ) {
//     const roomName = `${roomType}_${roomId}`;
//     socket.to(roomName).emit(event, data);
//   }

//   /**
//    * Get number of players in a room
//    */
//   static getRoomSize(io, roomId, roomType = ROOM_TYPES.BOSS_FIGHT) {
//     const roomName = `${roomType}_${roomId}`;
//     const room = io.sockets.adapter.rooms.get(roomName);
//     return room ? room.size : 0;
//   }

//   /**
//    * Get all socket IDs in a room
//    */
//   static getRoomSockets(io, roomId, roomType = ROOM_TYPES.BOSS_FIGHT) {
//     const roomName = `${roomType}_${roomId}`;
//     const room = io.sockets.adapter.rooms.get(roomName);
//     return room ? Array.from(room) : [];
//   }

//   /**
//    * Check if socket is in a specific room
//    */
//   static isSocketInRoom(socket, roomId, roomType = ROOM_TYPES.BOSS_FIGHT) {
//     const roomName = `${roomType}_${roomId}`;
//     return socket.rooms.has(roomName);
//   }

//   /**
//    * Leave all rooms of a specific type
//    */
//   static leaveAllRoomsOfType(socket, roomType) {
//     const rooms = Array.from(socket.rooms);
//     rooms.forEach((room) => {
//       if (room.startsWith(`${roomType}_`)) {
//         socket.leave(room);
//       }
//     });
//   }
// }
