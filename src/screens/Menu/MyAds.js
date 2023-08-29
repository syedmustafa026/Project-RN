import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import * as colors from "../../utilities/colors"
import * as fonts from "../../utilities/fonts"
import * as functions from '../../utilities/functions'

import SelectHorizontalChip from "../../components/Chips/SelectHorizonatlChip";
import { Checkbox } from "react-native-paper";
import Separator from "../../components/Extras/Separator";
import Toast from "../../components/Extras/Toast";

const MyAds = ({ navigation }) => {
  const [checked, setChecked] = useState(false)
  const [ads, setAds] = useState([])

  const getMyAds = async () => {
    try {
      const response = await functions.getUserAds()
      setAds(response)
    } catch (error) {
      Toast(error.message || "Server Error")
    }
  }
  useEffect(() => {
    getMyAds()

  }, [])
  const Item = (item) => {
    const data = item.item
    return (
      <View >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Checkbox
            color={colors.secondaryLight}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Image style={styles.cardImg} source={{ uri: data?.main_image_url }} />
          <View >
            <Text style={styles.h1}>{data.title || "Untitled Ad"}</Text>
            <View style={styles.badge}>
              <Text style={styles.h2}>{data.status}</Text>
            </View>
            <Text style={styles.h4}>{data.created_at_time_diff}</Text>
          </View>
        </View>
        <Separator />
        {data.status === "draft" ? <Text onPress={() => navigation.navigate('PlaceAd')} style={[styles.h1, { textAlign: 'right', marginVertical: 6, color: colors.primary }]}>Coninue Ad posting</Text> :
          <Text onPress={() => navigation.navigate('AdDetails', data)} style={[styles.h1, { textAlign: 'right', marginVertical: 6, color: colors.primary }]}>Show my ad</Text>}
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <FlatList
          data={['All Ads', 'Live', 'Draft', 'Rejected']}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (<SelectHorizontalChip name={item} selected={"All Ads"} />)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity onPress={() => setVerifiedModal(true)} activeOpacity={0.8} style={styles.banner} >
        <View style={{
          backgroundColor: '#cfe1fc',
          width: '27%',
          height: 90,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}>
          <MaterialIcon name="verified" size={35} color={colors.primary} />
        </View >
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 16 }}>
          <View>
            <Text style={{ fontFamily: fonts.BOLD, fontSize: 16, color: colors.black }}>Become a verified user</Text>
            <Text style={{ fontFamily: fonts.SEMIBOLD, fontSize: 12, color: colors.gray }}>Get a verified badge and</Text>
            <Text style={{ fontFamily: fonts.SEMIBOLD, fontSize: 12, color: colors.gray }}>Attracts more buyer to your ads</Text>
          </View>
          <MaterialIcon name="arrow-forward-ios" style={{ margin: 20, alignSelf: 'center' }} size={20} color={colors.primaryLight} />
        </View>
      </TouchableOpacity>
      <FlatList
        data={ads}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (<Item item={item} />)}
        keyExtractor={(item, index) => index.toString()}
      />

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  head: {
    paddingHorizontal: 6,
    backgroundColor: colors.gray200,
    paddingBottom: 6
  },
  cardImg: {
    width: 60,
    height: 60,
  },
  h1: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.SEMIBOLD,
    marginHorizontal: 12,

  },
  badge: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    width: 80,
    padding: 2,
    marginHorizontal: 12,
    color: colors.white,
    marginVertical: 4,
  },
  h2: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.MEDIUM,
  },
  h4: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.SEMIBOLD,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  banner: {
    backgroundColor: '#cfe1fc',
    width: "88%",
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 90,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderRadius: 10,
    elevation: 4,
  }
})
export default MyAds