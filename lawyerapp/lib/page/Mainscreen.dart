import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:lawyerapp/page/componnets/Homepage.dart';
import 'package:lawyerapp/page/componnets/calendar.dart';
import 'package:lawyerapp/page/componnets/expenses.dart';

class Mainscreen extends StatefulWidget {
  const Mainscreen({super.key});

  @override
  State<Mainscreen> createState() => _MainscreenState();
}

class _MainscreenState extends State<Mainscreen> {
  int _selectedIndex = 0;
  static const List<Widget> _widgetOptions = <Widget>[
    Homepage(),
    CalendarViewPage(),
    ExpensesPage(),
    Text(
      'Profile',
    ),
  ];

  String message = "";

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final arguments = ModalRoute.of(context)!.settings.arguments;
    if (arguments != null) {
      Map? pushArguments = arguments as Map;
      setState(() {
        message = pushArguments["message"];
      });
    }
  }

  int counter = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
     
      body: Stack(children: <Widget>[
        Container(
          decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage(
                    'images/background.png'), // ตัวอย่าง path ของ background image
                fit: BoxFit.cover,
                opacity: 0.1),
          ),
        ),
        Container(
          child: _widgetOptions.elementAt(_selectedIndex),
        )
      ]),
      bottomNavigationBar: Container(
        color: Colors.blue.shade400,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 20),
          child: GNav(
              duration: Duration(milliseconds: 400),
              iconSize: 24,
              backgroundColor: Colors.blue.shade400,
              color: Colors.white,
              activeColor: Colors.white,
              tabBackgroundColor: Colors.blue.shade800,
              gap: 8,
              selectedIndex: _selectedIndex,
              padding: EdgeInsets.all(16),
              onTabChange: (index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
              tabs: const [
                GButton(
                  icon: Icons.home,
                  text: 'Home',
                ),
                GButton(
                  icon: Icons.calendar_month,
                  text: 'Calendar',
                ),
                GButton(
                  icon: Icons.insert_chart,
                  text: 'Expenses',
                ),
                GButton(
                  icon: Icons.settings,
                  text: 'Settings',
                ),
              ]),
        ),
      ),
    );
  }
}
