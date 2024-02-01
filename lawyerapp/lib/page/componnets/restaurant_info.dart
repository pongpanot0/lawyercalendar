import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/rendering.dart';
import 'package:lawyerapp/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RestaurantInfo extends StatefulWidget {
  const RestaurantInfo({super.key});

  @override
  State<RestaurantInfo> createState() => _RestaurantInfoState();
}

class _RestaurantInfoState extends State<RestaurantInfo> {
  late MyTheme myTheme = Theme2();
  @override
  void initState() {
    _loadCurrentTheme();
  }

  _loadCurrentTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? themeName = prefs.getString('current_theme');

    if (themeName == 'theme1') {
      myTheme = Theme1();
    } else if (themeName == 'theme2') {
      myTheme = Theme2();
    } else if (themeName == 'theme3') {
      myTheme = Theme3();
    }
  }

  _switchTheme(MyTheme newTheme) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    myTheme = newTheme;
    if (newTheme is Theme1) {
      prefs.setString('current_theme', 'theme1');
    } else if (newTheme is Theme2) {
      prefs.setString('current_theme', 'theme2');
    } else if (newTheme is Theme3) {
      prefs.setString('current_theme', 'theme3');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(25), color: myTheme.cardColors),
        margin: EdgeInsets.only(top: 20),
        width: MediaQuery.of(context).size.width - 20,
        padding: EdgeInsets.symmetric(horizontal: 15, vertical: 20),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "THE SIAM BARRISTERS COMPANY LIMITED",
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.white),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Row(
                      children: [
                        Text(
                          "นาย พงศ์ปณต สมัครการ",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    )
                  ],
                ),
                /*  ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                  child: Image.asset(
                    "images/logo.png",
                    width: 80,
                  ),
                ) */
              ],
            ),
            SizedBox(
              height: 5,
            ),
          ],
        ));
  }
}
