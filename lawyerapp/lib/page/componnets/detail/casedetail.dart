import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:casa_vertical_stepper/casa_vertical_stepper.dart';
import 'package:lawyerapp/page/componnets/Apiservice.dart';
import 'package:lawyerapp/page/componnets/Card.dart';
import 'package:lawyerapp/page/componnets/detail/carddetail.dart';
import 'package:flutter_holo_date_picker/flutter_holo_date_picker.dart';
import 'package:intl/intl.dart';
import 'dart:convert';
import 'dart:async';

import 'package:lawyerapp/page/componnets/detail/todolist.dart';

class User {
  final String tsb_ref;
  final String rednum;
  final String blacknum;
  final String DuedateSummittree;
  final String Customer_ref;
  final String ClientName;
  final String CaseTypeName;
  final int CaseID;
  final String timeline_status_name;
  final String case_timebar_incoming;
  const User(
      {required this.tsb_ref,
      required this.rednum,
      required this.blacknum,
      required this.DuedateSummittree,
      required this.Customer_ref,
      required this.ClientName,
      required this.CaseTypeName,
      required this.CaseID,
      required this.timeline_status_name,
      required this.case_timebar_incoming});
}

class CaseDetail extends StatefulWidget {
  final int CaseID;
  const CaseDetail({Key? key, required this.CaseID}) : super(key: key);

  @override
  State<CaseDetail> createState() => _CaseDetailState();
}

class _CaseDetailState extends State<CaseDetail> {
  List<dynamic> data = [];
  late int? selectedTimelineId = 1;
  List<dynamic> caseExpenses = [];
  List<dynamic> CaseNotices = [];
  List<dynamic> caseLawyer = [];
  List<dynamic> case_plainiff = [];
  List<dynamic> case_defendant = [];
  List<dynamic> timelien = [];
  List<dynamic> timelineTypes = [];
  String? dropdownvalue;
  int _selectedIndex = 0;

  void initState() {
    fetchData();
    getTimelineType();
    super.initState();
  }

  List categoryItemlist = [];

  late List<dynamic> timelineData; // <-- Change the type here

  Future<void> getTimelineType() async {
    final apiService = ApiService();
    var response = await apiService.getTimelineType();

    try {
      // Assuming your API response is a List<Map<String, dynamic>>

      var jsonData = response;
      setState(() {
        timelineData = jsonData;
      });
    } catch (e) {
      print('Error parsing API response: $e');
      throw Exception('Error fetching timeline types');
    }
  }

  Color getColorBasedOnStatus(int caseTimelineEnd) {
    return caseTimelineEnd == 1 ? Colors.green : Colors.orange;
  }

  List<StepperStep> stepperList = [];
  Future<void> fetchData() async {
    try {
      print('fetchData successful');
      final apiService = ApiService();
      var response = await apiService.getCaseByid(widget.CaseID);
      setState(() {
        data = response['data'];
        caseExpenses = response['caseExpenses'];
        CaseNotices = response['CaseNotices'];
        caseLawyer = response['caseLawyer'];
        timelien = response['timelien'];

        stepperList = timelien.map((timelineItem) {
          print(timelineItem);
          String incomingDateString = timelineItem['case_timebar_incoming'];

          DateTime incomingDate = DateTime.parse(
              incomingDateString); // Assuming incomingDateString is in a parseable format
          Color statusColor =
              getColorBasedOnStatus(timelineItem['case_timeline_end']);

          String formattedDate = DateFormat('dd-MM-yyyy').format(incomingDate!);
          return StepperStep(
            title: Text(timelineItem['timeline_status_name']),
            trailing: Text(formattedDate),
            view: GestureDetector(
              onTap: () {
                // Navigate to the new page when the CardDetail is clicked
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => TodoList(
                        case_timeline_id: timelineItem['case_timeline_id'],
                        CaseID: widget.CaseID
                        // Pass any necessary data to YourNewPage if needed

                        ),
                  ),
                );
              },
              child: CardDetail(
                Balance: timelineItem['timeline_status_name'],
                balance: 10.00,
                cardNumber: 10,
                expiredMonth: 10,
                expiredYear: 2025,
                color: statusColor,
                cardType: timelineItem['case_timeline_detail'],
              ),
            ),
          );
        }).toList();
      });
    } catch (e) {
      print('ja $e');
    }
  }

  Future<void> createCasetimeline(
      String textController, int selectedValue, String selectedDate) async {
    try {
      var data = {
        "case_timeline_detail": textController,
        "case_timebar_incoming": selectedDate,
        "case_timebar_status": selectedValue,
        "case_id": widget.CaseID
      };

      final apiService = ApiService();
      var response = await apiService.createcaseTimeline(data);

      await fetchData();
      await getTimelineType();
    } catch (e) {
      print({"data": e});
    }
  }

  @override
  Widget build(BuildContext context) {
    String dateStr = data.isNotEmpty
        ? data[0]['case_timebar_incoming'] ?? ""
        : "2024-01-16 00:00:00.000Z";
    DateTime date = DateTime.parse(dateStr);

// Format the DateTime object as DD/MM/YYYY
    String formatstedDate = DateFormat('dd/MM/yyyy').format(date);

    int claimAmount = data.isNotEmpty ? data[0]['claimAmount'] ?? "" : 0;

    // Format the number with commas
    String formattedAmount = NumberFormat('#,###').format(claimAmount);
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.grey.shade900,
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            showModal(context);
          },
          label: const Text('เพิ่มข้อมูลใหม่'),
          icon: const Icon(Icons.add, color: Colors.white, size: 12),
        ),
        body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              scale: 1.7,
              alignment: Alignment.center,
              opacity: 0.1,
              image: AssetImage(
                'images/newbackground.png',
              ), // Replace with your image URL
              fit: BoxFit.contain,
            ),
          ),
          child: Column(
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
                              Text(
                                  "TSB Ref. : ${data.isNotEmpty ? data[0]['tsb_ref'] ?? "" : ""}"),
                              Text(
                                  "ศาล : ${data.isNotEmpty ? data[0]['CourtName'] ?? "" : ""}"),
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
                              Text(
                                  "หมายเลขคดีดำ : ${data.isNotEmpty ? data[0]['blacknum'] ?? "" : ""}"),
                              Text(
                                  "หมายเลขคดีแดง : ${data.isNotEmpty ? data[0]['rednum'] ?? "" : ""}"),
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
                              Text("ทุนทรัพย์ : ${formattedAmount}"),
                              Text("วันนัด : ${formatstedDate}"),
                            ]),
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Text(
                        "สถานะคดีปัจจุบัน : ${data.isNotEmpty ? data[0]['timeline_status_name'] ?? "" : ""}"),
                    SizedBox(
                      height: 10,
                    ),
                  ]),
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Builder(builder: (context) {
                    return CasaVerticalStepperView(
                      steps: stepperList,
                      seperatorColor: const Color(0xffD2D5DF),
                      isExpandable: true,
                      showStepStatusWidget: false,
                    );
                  }),
                ),
              ),
              SizedBox(
                height: 50,
              )
            ],
          ),
        ));
  }

  void showModal(BuildContext context) {
    // Controllers for input text
    TextEditingController textController = TextEditingController();
    // Default values for input select and input date
    int selectedValue = 1;
    DateTime? selectedDate;

    showDialog<void>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text('เพิ่มสถานะงาน'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            StatefulBuilder(builder: (context, setState) {
              return DropdownButtonHideUnderline(
                child: DropdownButton2<int?>(
                  isDense: true,
                  isExpanded: true,
                  hint: Text('Select Timeline'),
                  value: selectedTimelineId,
                  onChanged: (int? newValue) {
                    setState(() {
                      selectedTimelineId = newValue;
                    });
                  },
                  items: timelineData.map((timeline) {
                    return DropdownMenuItem<int>(
                      value: timeline['timeline_status_id'],
                      child: Text(timeline['timeline_status_name']),
                    );
                  }).toList(),
                ),
              );
            }),
            TextField(
              controller: textController,
              decoration: InputDecoration(labelText: 'หมายเหตุ'),
              maxLines:
                  null, // Set to null for an unlimited number of lines or a specific number
              minLines: 5, // Set a minimum number of lines to display
            ),
            // Input Date
            SizedBox(
              height: 10,
            ),

            Row(
              children: [
                SizedBox(width: 20),
                Container(
                  width: MediaQuery.of(context).size.width / 2,
                  child: ElevatedButton(
                    onPressed: () async {
                      var datePicked = await DatePicker.showSimpleDatePicker(
                        context,
                        // initialDate: DateTime(2020),
                        firstDate: DateTime(2020),
                        lastDate: DateTime(2090),
                        dateFormat: "dd-MMMM-yyyy",
                        locale: DateTimePickerLocale.en_us,
                        looping: true,
                      );
                      if (datePicked != null) {
                        // Update the button text with the selected date
                        setState(() {
                          selectedDate = datePicked;
                        });
                      }
                    },
                    child: Text(
                        '${selectedDate != null ? DateFormat('dd-MM-yyyy').format(selectedDate!) : 'Choose a Date'}'),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Close'),
          ),
          TextButton(
            onPressed: ()  {
              // Perform actions with
              //prithe selected values
              createCasetimeline(textController.text, selectedTimelineId ?? 1,
                  selectedDate.toString());
              Navigator.pop(context);
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }
}
