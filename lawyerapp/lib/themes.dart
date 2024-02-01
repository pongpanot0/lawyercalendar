import 'package:flutter/material.dart';

abstract class MyTheme {
  late Color cardColors;
  late Color cardTabColors;
  late Color activeColors;
  late Color bottomColor;
  late Color fontColors;
  late Color danger;
  late Color cardfontColors;
}

class Theme1 extends MyTheme {
  Color cardColors = const Color(0xFF43766C);
  Color cardTabColors = const Color(0xFFF8FAE5);
  Color activeColors = const Color(0xFFB19470);
  Color bottomColor = const Color(0xFF76453B);
  Color fontColors = Colors.white;
  Color cardfontColors = Colors.white;
  Color danger = Colors.red;
}

class Theme2 extends MyTheme {
  Color cardColors = const Color(0xFFD8B6A4);
  Color cardTabColors = const Color(0xFFD8B6A4);
  Color activeColors = const Color(0xFF630000);
  Color bottomColor = const Color(0xFF000000);
  Color fontColors = Colors.white;
  Color cardfontColors = Colors.black;
  Color danger = Colors.red;
}

class Theme3 extends MyTheme {
  Color cardColors = Color.fromARGB(255, 251, 178, 178);
  Color cardTabColors = const Color(0xFFF68989);
  Color activeColors = const Color(0xFFC65D7B);
  Color bottomColor = const Color(0xFF874356);
  Color fontColors = Colors.white;
  Color cardfontColors = Colors.black;
  Color danger = Colors.red;
}
