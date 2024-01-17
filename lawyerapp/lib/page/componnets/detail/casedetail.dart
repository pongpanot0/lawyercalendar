import 'package:flutter/material.dart';
import 'package:casa_vertical_stepper/casa_vertical_stepper.dart';
import 'package:lawyerapp/page/componnets/Card.dart';
import 'package:lawyerapp/page/componnets/detail/carddetail.dart';

class CaseDetail extends StatefulWidget {
  const CaseDetail({super.key});

  @override
  State<CaseDetail> createState() => _CaseDetailState();
}

class _CaseDetailState extends State<CaseDetail> {
  int _selectedIndex = 0;
  final stepperList = [
    StepperStep(
      title: Text('นัดสืบ'),
      trailing: Text("13/01/2024"),
      view: CardDetail(
        Balance: "นัดสืบ",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.amber,
        cardType: "ATM",
      ),
    ),
    StepperStep(
      title: Text('ยื่นฟ้อง'),
      trailing: Text("12/01/2024"),
      view: CardDetail(
        Balance: "ยื่นฟ้อง",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.green,
        cardType: "ATM",
      ),
    ),
    StepperStep(
      title: Text('ทำเอกสาร'),
      trailing: Text("11/01/2024"),
      view: CardDetail(
        Balance: "ทำเอกสาร",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.green,
        cardType: "ATM",
      ),
    ),
    StepperStep(
      title: Text('รับเอกสารข้อมูลคดี'),
      trailing: Text("10/01/2024"),
      view: CardDetail(
        Balance: "รับเอกสารข้อมูลคดี",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.green,
        cardType: "ATM",
      ),
    ),
    StepperStep(
      title: Text('ส่งเอกสารให้ลูกค้า'),
      trailing: Text("09/01/2024"),
      view: CardDetail(
        Balance: "ส่งเอกสารให้ลูกค้า",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.green,
        cardType: "ATM",
      ),
    ),
    StepperStep(
      title: Text('รับเอกสารจากลูกค้า'),
      trailing: Text("08/01/2024"),
      view: CardDetail(
        Balance: "รับเอกสารจากลูกค้า",
        balance: 10.00,
        cardNumber: 10,
        expiredMonth: 10,
        expiredYear: 2025,
        color: Colors.green,
        cardType: "ATM",
      ),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {},
          label: const Text('เพิ่มข้อมูลใหม่'),
          icon: const Icon(Icons.add, color: Colors.white, size: 12),
        ),
        
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 10, bottom: 10),
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                shadowColor: Colors.black,
                child: Column(children: [
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 10, right: 10),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("TSB Ref : 1234"),
                            Text("ศาล : รัชดา"),
                          ]),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 10, right: 10),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text("หมายเลขคดีดำ : 1234"),
                            Text("หมายเลขคดีแดง : 1234"),
                          ]),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 10, right: 10),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("โจทย์ : พงศ์ปณต สมัครการ"),
                            Text("จำเลย : พงศ์ปณต สมัครการ"),
                          ]),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 10, right: 10),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("ทุนทรัพย์ : 12000"),
                            Text("วันนัด : 30/01/2024"),
                          ]),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Text("สถานะคดีปัจจุบัน : ยื่นคำฟ้อง"),
                  SizedBox(
                    height: 10,
                  ),
                  Text("ข้อมูลคู่กรณี"),
                  SizedBox(
                    height: 20,
                  ),
                ]),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: CasaVerticalStepperView(
                  steps: stepperList,
                  seperatorColor: const Color(0xffD2D5DF),
                  isExpandable: true,
                  showStepStatusWidget: false,
                ),
              ),
            ),
            SizedBox(height: 50,)
          ],
        ));
  }

  void showModal(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        content: const Text('Example Dialog'),
        actions: <TextButton>[
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Close'),
          )
        ],
      ),
    );
  }
}
