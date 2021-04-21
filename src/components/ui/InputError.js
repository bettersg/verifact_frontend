import styled from 'styled-components'

import { Text } from '../../styles'

const InputError = styled(Text.Small)`
  color: var(--TextError);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`

export default InputError
