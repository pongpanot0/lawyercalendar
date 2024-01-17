import 'package:flutter/material.dart';
import 'package:lawyerapp/page/componnets/customerappbar.dart';
import 'package:lawyerapp/page/componnets/detail/casedetail.dart';
import 'package:lawyerapp/page/componnets/restaurant_info.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  final List<String> dataList = [
    'Case 1',
    'Case 2',
    'Case 3',
    'Case 4',
    'Case 1',
    'Case 2',
    'Case 3',
    'Case 4',

    // เพิ่มข้อมูลเพิ่มเติมตามต้องการ
  ];
  int _currentSegmentIndex = 0;
  final Map<int, Widget> _children = {
    0: Text('Type 1'), // Replace with your desired text or widget.
    1: Text('Type 2'), // Replace with your desired text or widget.
    // Add more segments as needed.
  };
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: [
        SizedBox(
          height: 10,
        ),
        CustomAppBar(leftIcon: Icons.home, rightIcon: Icons.notifications),
        RestaurantInfo(),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SingleChoice()
              // Add more buttons as needed
            ],
          ),
        ),
        Expanded(
          child: Container(
            child: ListView.builder(
              itemCount: dataList.length,
              itemBuilder: (BuildContext context, int index) {
                return Padding(
                  padding: const EdgeInsets.only(
                      top: 0, bottom: 8, left: 8, right: 8),
                  child: Card(
                    elevation: 4.0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: ListTile(
                      dense: true,
                      title: Text(dataList[index]),
                      subtitle: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Text('TimeLine คดี'),
                          SizedBox(
                            height: 10,
                          ),
                          Text('กำหนดการครั้งถัดไปวันที่ 13/01/2024'),
                          SizedBox(
                            height: 5,
                          ),
                        ],
                      ),
                      trailing: Icon(Icons.arrow_forward), // ตัวอย่าง icon
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => CaseDetail()),
                        );
                      },
                    ),
                  ),
                );
              },
            ),
          ),
        )
      ],
    ));
  }

  Widget _buildSegmentedControlButton(int index, String text) {
    return ElevatedButton(
      onPressed: () {
        setState(() {
          _currentSegmentIndex = index;
        });
      },
      style: ElevatedButton.styleFrom(
        primary: _currentSegmentIndex == index
            ? Colors.blue // Active color
            : Colors.grey, // Inactive color
      ),
      child: Text(text),
    );
  }
}

enum Calendar { day, week, month, year }

class SingleChoice extends StatefulWidget {
  const SingleChoice({super.key});

  @override
  State<SingleChoice> createState() => _SingleChoiceState();
}

class _SingleChoiceState extends State<SingleChoice> {
  Calendar calendarView = Calendar.day;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width / 1.1,
      child: SegmentedButton<Calendar>(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.resolveWith<Color?>(
            (Set<MaterialState> states) {
              if (states.contains(MaterialState.selected)) {
                return Color.fromARGB(255, 108, 120, 255);
              }
              return null; // Use the component's default.
            },
          ),
        ),
        segments: const <ButtonSegment<Calendar>>[
          ButtonSegment<Calendar>(
              value: Calendar.day,
              label: Text('คดีที่ฟ้อง'),
              icon: Icon(Icons.calendar_view_day)),
          ButtonSegment<Calendar>(
            value: Calendar.week,
            label: Text('คดีที่ถูกฟ้อง'),
            icon: Icon(Icons.calendar_view_week),
          ),
        ],
        selected: <Calendar>{calendarView},
        onSelectionChanged: (Set<Calendar> newSelection) {
          setState(() {
            // By default there is only a single segment that can be
            // selected at one time, so its value is always the first
            // item in the selected set.
            calendarView = newSelection.first;
          });
        },
      ),
    );
  }
}
