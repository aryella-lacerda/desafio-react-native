import type { GlobalState } from '../../../Redux'
import type { State as ToDoEntityState } from '../Redux/Entity'
import { createSelector } from '@reduxjs/toolkit'
import type { ToDoType } from '../Entities'
import { orderBy } from 'lodash'

import UISelectors from './Ui'
import { Filters } from '../Constants'

export const toDos = (state: GlobalState): ToDoEntityState => state.entities.toDos

export const sortedToDos = createSelector(toDos, (toDos: ToDoType[]) => orderBy(toDos, ['isDone'], ['asc']))

export const filteredToDos = createSelector(
  toDos,
  UISelectors.selectedFilterIndex,
  (toDoArray, selectedFilterIndex) => {}
)

type ToDoEntitySelectors = {
  toDos: (state: GlobalState) => ToDoEntityState
}

export default ({
  toDos,
  sortedToDos,
  filteredToDos
}: ToDoEntitySelectors)
