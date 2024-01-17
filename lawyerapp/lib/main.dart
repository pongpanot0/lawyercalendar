import 'dart:async';
import 'dart:convert';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:lawyerapp/firebase_options.dart';
import 'package:lawyerapp/page/Mainscreen.dart';

import 'package:flutter/material.dart';
import 'package:lawyerapp/page/login.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  FirebaseMessaging messaging = FirebaseMessaging.instance;
  FirebaseMessaging.instance.getToken().then((value) {
    print("getToken :$value");
  });
  NotificationSettings settings = await messaging.requestPermission(
    alert: true,
    announcement: false,
    badge: true,
    carPlay: false,
    criticalAlert: false,
    provisional: false,
    sound: true,
  );
  if (settings.authorizationStatus == AuthorizationStatus.authorized) {
    print('User granted permission');
  } else {
    print('User declined or has not accepted permission');
  }

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    // Handle foreground messages
    print(message.notification?.title);
    print(message.notification?.body);
  });

  FirebaseMessaging.onBackgroundMessage(_firebaseMessageingBackgroundHandler);
  runApp(MyApp());
}

Future<void> _firebaseMessageingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  print("_FirebaseMessageBackgroundHandler: $message");
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.system,
      home: LoginPage(),
      navigatorKey: navigatorKey,
    );
  }
}
