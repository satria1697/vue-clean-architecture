import { container } from 'tsyringe'

import { Api } from '../services/api'

const regisContainer = () => {
  container.register('ApiService', {
    useClass: Api
  })
}

export default regisContainer
