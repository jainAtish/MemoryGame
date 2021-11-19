import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'

const App = (props) => {
  const [list, setList] = useState(shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']))
  const [selected, setSelected] = useState({
    prev: '',
    next: ''
  })
  const [prevSelected, setPrevSelected] = useState('')

  const [turns, setTurns] = useState(0)
  const [match, setMatch] = useState([])
  const [reset, setReset] = useState(false)


  useEffect(() => {
    resetGame()
  }, [reset])

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  function calculate(index) {
    if (selected.prev !== '') {
      if (list[selected.prev] === list[index]) {
        setMatch([...match, {
          prev: selected.prev,
          next: index
        }])

      }
      setSelected({ ...selected, next: index })
      setTimeout(() => {
        setSelected({
          prev: '',
          next: ''
        })
      }, 1000)
      setTurns(turns + 1)
    }
    else {
      setSelected({ ...selected, prev: index })
    }
  }

  function resetGame() {
    setList(shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']))
    setSelected({
      prev: '',
      next: ''
    })
    setPrevSelected('')
    setTurns(0)
    setMatch([])
    setReset(false)

  }


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.fr_jcSA_ac}>
        <View style={styles.ac}>
          <Text style={styles.headText}>Matches</Text>
          <Text style={styles.headText}>{match.length}</Text>
        </View>
        <View style={styles.ac}>
          <Text style={styles.headText}>Turns</Text>
          <Text style={styles.headText}>{turns}</Text>
        </View>
      </View>
      {
        match.length === 8 ?
          <View style={styles.f1_jcC}>
            <Text style={styles.gameOver}>Game Over</Text>
          </View>
          :
          <FlatList
            data={list}
            ItemSeparatorComponent={() => <View style={styles.ht20} />}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.jcSB}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                disabled={index === selected.prev || selected.next != '' || match.some((item) => item.prev === index || item.next === index)}
                onPress={() => {
                  calculate(index)
                }}>
                <View style={[styles.cardContainer,
                (index === selected.prev || index === selected.next ? styles.openedCard :
                  match.some((item) => item.prev === index || item.next === index) ? styles.closedCard : {}
                )]}>
                  {
                    index === selected.prev || index === selected.next ?
                      <Text style={styles.f20}>{item}</Text>
                      : null
                  }

                </View>
              </TouchableOpacity>
            }
            numColumns={4}
          />
      }
      <Button title="Restart" onPress={() => { setReset(!reset) }} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  jcSB: {
    justifyContent: 'space-between'
  },
  f1_jcC: {
    flex: 1,
    justifyContent: 'center'
  },
  f20: {
    fontSize: 20
  },
  ht20: {
    height: 20
  },
  closedCard: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  openedCard: {
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  listContainer: {
    paddingHorizontal: 10,
    marginTop: 30
  },
  gameOver: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },
  headText: {
    color: 'black',
    fontSize: 16
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 80,
    backgroundColor: 'rgba(255,0,0,0.5)'
  },
  fr_jcSA_ac: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ac: {
    alignItems: 'center',
  }
});
