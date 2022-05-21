import {render, screen} from '@testing-library/react'

import {CreateSession} from './CreateSession'

it('shows a loading message when waiting for a session ID', async () => {
  render(<CreateSession setRole={() => {}} setConnectionList={() => {}} connectionList={[]} />)
  expect(screen.getByText('Getting session code...')).toBeInTheDocument()
})