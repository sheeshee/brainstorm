import Peer from 'peerjs'

export const makePeer = () => {
  const peer = new Peer({
    secure: true,
    host: 'rooster-thought.herokuapp.com', // change here the herokuapp name
    port: 443
  })
  peer.on('error', (err) => console.error(err))
  return peer
}
