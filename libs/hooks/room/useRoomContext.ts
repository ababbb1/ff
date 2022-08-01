import { useContext } from 'react';
import { RoomContext } from '../../../components/room/room-state-provider';
import { RoomContextType } from '../../types/room';

export default function useRoomContext() {
  return useContext(RoomContext) as RoomContextType;
}
