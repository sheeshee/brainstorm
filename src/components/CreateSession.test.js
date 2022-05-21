import {render, screen} from '@testing-library/react'

import {CreateSession} from './CreateSession'
import {makePeer} from '../utils'

jest.mock('../utils')

it('shows a loading message when waiting for a session ID', async () => {
  makePeer.mockImplementation(() => ({
    on: () => {}
  }))
  render(<CreateSession setRole={() => {}} setConnectionList={() => {}} connectionList={[]} />)
  expect(screen.getByText('Getting session code...')).toBeInTheDocument()
})

it('shows the session code when loaded', async () => {
  const code = 'testcode'
  makePeer.mockImplementation(() => ({
    on: (_, setCode) => setCode(code)
  }))
  render(<CreateSession setRole={() => {}} setConnectionList={() => {}} connectionList={[]} />)
  expect(screen.getByText(code)).toBeInTheDocument()
})