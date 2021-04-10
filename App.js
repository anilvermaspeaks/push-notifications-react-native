import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

//running notifications in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
})




export default function App() {
  //on component mount
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
      if (statusObj.status !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      return statusObj;
    }).then((statusObj) => {
      if (statusObj.status !== 'granted') {
        return;
      }
    })
  }, [])


  //handling action on notification(in background and foreground)
  useEffect(() => {
    // action when notification received while  app is closed
    const BackGroundNotificationSubscription = Notifications.addNotificationResponseReceivedListener((data) => {
      console.log("data")
      console.log(data)
      console.log("data")
    });

    // action when notification received while running app
    const notificationSubscription = Notifications.addNotificationReceivedListener((data) => {
      console.log("data")
      console.log(data)
      console.log("data")
    });
    return () => {
      notificationSubscription.remove();
      BackGroundNotificationSubscription.remove();
    }
  }, [])


  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }



  return (
    <View style={styles.container}>
      <Button
        onPress={triggerNotifications}
        title="Trigger Local Notifications"
        color="#841584"
        accessibilityLabel="Trigger Local Notifications"
      />
      <Text>Hey this is anil! welcome medffdfd</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
