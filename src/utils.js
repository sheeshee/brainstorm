import Peer from 'peerjs'

export const makePeer = () => {
  const peer = new Peer()
  peer.on('error', (err) => console.error(err))
  return peer
}
