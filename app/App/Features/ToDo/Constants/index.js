// @flow
import { values } from 'lodash'

export const FILTERS = {
  ALL: 'Todos',
  TODAY: 'Hoje',
  THIS_WEEK: 'Esta semana',
  LATE: 'Atrasados'
}

export const Filters = values(FILTERS)
