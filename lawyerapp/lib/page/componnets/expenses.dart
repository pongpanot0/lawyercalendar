import 'package:flutter/material.dart';
import 'package:flutter_echarts/flutter_echarts.dart';
import 'package:lawyerapp/page/componnets/Card.dart';
import 'package:lawyerapp/page/componnets/customerappbar.dart';

class ExpensesPage extends StatefulWidget {
  const ExpensesPage({super.key});

  final Color leftBarColor = Colors.yellow;
  final Color rightBarColor = Colors.red;
  final Color avgColor = Colors.redAccent;
  @override
  State<ExpensesPage> createState() => _ExpensesPageState();
}

class _ExpensesPageState extends State<ExpensesPage> {
  final List<String> dataList = [
    'ค่าศาล',
    'ค่าเอกสาร',
    'ค่าเอกสาร',
    'ค่าศาล',
    'ค่าเดินทาง',
    'ค่าศาล',
    'ค่าเดินทาง',
    'ค่าศาล',
    // เพิ่มข้อมูลเพิ่มเติมตามต้องการ
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          SizedBox(
            height: 10,
          ),
          Container(
            height: 245,
            child: Column(
              children: <Widget>[
                SizedBox(
                  height: 20,
                ),
                Expanded(
                  child: Container(
                    height: 100, // Fixed height for MyCard
                    child: MyCard(
                      balance: 10.00,
                      cardNumber: 10,
                      expiredMonth: 10,
                      expiredYear: 2025,
                      color: Colors.redAccent,
                      cardType: "ATM",
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    SizedBox.fromSize(
                      size: Size(150, 56), // button width and height
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20.0),
                        child: Material(
                          color: Colors.blueAccent, // button color
                          child: InkWell(
                            splashColor: Colors.green, // splash color
                            onTap: () {}, // button pressed
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Icon(
                                  Icons.call,
                                  color: Colors.white,
                                ), // icon
                                Text("เบิกแล้ว",
                                    style:
                                        TextStyle(color: Colors.white)), // text
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox.fromSize(
                      size: Size(150, 56), // button width and height
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20.0),
                        child: Material(
                          color: Colors.blueAccent, // button color
                          child: InkWell(
                            splashColor: Colors.green, // splash color
                            onTap: () {}, // button pressed
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Icon(Icons.call, color: Colors.white), // icon
                                Text(
                                  "ยังไม่ได้เบิก",
                                  style: TextStyle(color: Colors.white),
                                ), // text
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            child: Expanded(
              child: ListView.builder(
                itemCount: dataList.length,
                itemBuilder: (BuildContext context, int index) {
                  return Padding(
                    padding: const EdgeInsets.only(
                        left: 8.0, right: 8.0, top: 5, bottom: 5),
                    child: Card(
                      elevation: 4.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16.0),
                      ),
                      child: ListTile(
                        title: Text(dataList[index]),
                        subtitle: Text('50 บาท'),
                        onTap: () {
                          // ทำงานเมื่อ Card ถูกแตะ
                          print('Tapped on ${dataList[index]}');
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          SizedBox(height: 50)
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        label: const Text('Add'),
        icon: const Icon(Icons.add, color: Colors.white, size: 25),
      ),
    );
  }
}
