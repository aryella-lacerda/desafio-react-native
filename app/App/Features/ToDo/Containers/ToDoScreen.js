// @flow
import React, { useEffect } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import MomentConfig from '../../../Config/MomentConfig'

import ToDo from '../Components/ToDo'
import TogglableText from '../Components/TogglableText'

import { actions as UIActions } from '../Redux/Ui'
import { actions as EntityActions } from '../Redux/Entity'

import ToDoEntitySelectors from '../Selectors/Entity'
import ToDoUISelections from '../Selectors/Ui'

import styles from './ToDoScreen.style'
import { Images } from '../../../Themes'

import { Filters } from '../Constants'

import moment from 'moment'

type Props = {
  navigation: any
}

MomentConfig.setLanguage()

const ToDoScreen = ({ navigation }: Props) => {
  // Redux Actions
  const dispatch = useDispatch()

  // Selectors
  const filteredToDos = useSelector(ToDoEntitySelectors.filteredToDos)
  const isEmpty = useSelector(ToDoEntitySelectors.isEmpty)

  const selectedFilterIndex = useSelector(ToDoUISelections.selectedFilterIndex)
  const fetching = useSelector(ToDoUISelections.fetching)
  const error = useSelector(ToDoUISelections.error)

  // Lifecycle Methods
  useEffect(() => {
    dispatch(UIActions.request())
  }, [dispatch])

  return (
    <ImageBackground source={Images.appBackground} style={styles.background}>
      <HeaderContainer onPressSearch={() => {}} />
      <View style={styles.tasksContainer}>
        <FilterListContainer
          filterList={Filters}
          selectedFilter={selectedFilterIndex}
          onPressFilter={index => {
            dispatch(UIActions.setSelectedFilterIndex({ index }))
          }}
        />
        {!isEmpty && !fetching && !error && !!filteredToDos && (
          <FlatList
            style={{ marginLeft: 12 }}
            data={filteredToDos}
            keyExtractor={(item, index) => `${item.id}-${index}-${item.title}`}
            renderItem={({ item }) => (
              <ToDo
                onPressText={() => {}}
                toggleToDo={() => {
                  dispatch(EntityActions.toggleToDo({ id: item.id }))
                }}
                text={item.title}
                toggled={item.isDone}
              />
            )}
          />
        )}
      </View>
      <FloatingButton onPress={() => {}} />
    </ImageBackground>
  )
}

const FloatingButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
    <Image source={Images.add['36px']} />
  </TouchableOpacity>
)

const FilterListContainer = ({ filterList, selectedFilter, onPressFilter }) => (
  <View style={styles.filterContainer}>
    <FlatList
      bounces={false}
      keyboardShouldPersistTaps='handled'
      showsHorizontalScrollIndicator={false}
      horizontal
      data={filterList}
      keyExtractor={(item, index) => `${index}-${item}`}
      renderItem={({ item, index }) => (
        <TogglableText toggled={selectedFilter === index} text={item} onPressText={() => onPressFilter(index)} />
      )}
    />
  </View>
)

const HeaderContainer = ({ onPressSearch }) => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.displayDateName}>Hoje</Text>
      <Text style={styles.date}>{moment().format('dddd, DD MMMM')}</Text>
    </View>
    <TouchableOpacity activeOpacity={0.7} onPress={onPressSearch} style={styles.searchContainer}>
      <Image source={Images.search['24px']} />
    </TouchableOpacity>
  </View>
)

export default ToDoScreen
