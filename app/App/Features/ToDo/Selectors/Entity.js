// @flow
import type { GlobalState } from '../../../Redux'
import type { State as ToDoEntityState } from '../Redux/Entity'
import moment from 'moment'

import { createSelector } from '@reduxjs/toolkit'
import type { ToDo } from '../Entities'
import { orderBy } from 'lodash'

import UISelectors from './Ui'
import { Filters, FILTERS } from '../Constants'

export const toDos = (state: GlobalState): ToDoEntityState => state.entities.toDos

export const sortedToDos = createSelector(toDos, (toDoArray: ToDo[]) => orderBy(toDoArray, ['isDone'], ['asc']))

export const filteredToDos = createSelector(
  sortedToDos,
  UISelectors.selectedFilterIndex,
  (toDoArray: ToDo[], selectedFilterIndex: number) => {
    const filtro = Filters[selectedFilterIndex]

    if (filtro === FILTERS.TODAY) {
      return toDoArray.filter(todo => moment(todo.reminder || null).isSame(moment(), 'day'))
    }

    return toDoArray
  }
)

export const isEmpty = createSelector(filteredToDos, () => filteredToDos.length === 0)

type ToDoEntitySelectors = {
  toDos: (state: GlobalState) => ToDoEntityState,
  sortedToDos: (state: GlobalState) => ToDo[],
  filteredToDos: (state: GlobalState) => ToDo[],
  isEmpty: (state: GlobalState) => boolean
}

export default ({
  toDos,
  sortedToDos,
  filteredToDos,
  isEmpty
}: ToDoEntitySelectors)
