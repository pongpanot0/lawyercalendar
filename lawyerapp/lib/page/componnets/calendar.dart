import 'package:flutter/material.dart';
import 'package:lawyerapp/page/componnets/customerappbar.dart';
import 'package:table_calendar/table_calendar.dart';

class CalendarViewPage extends StatefulWidget {
  const CalendarViewPage({super.key});

  @override
  State<CalendarViewPage> createState() => _CalendarViewPageState();
}

class _CalendarViewPageState extends State<CalendarViewPage> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay = DateTime.now(); // Initialize with a default value
  Map<DateTime, List<dynamic>> _events = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SizedBox(height: 20,),
          TableCalendar(
            firstDay: DateTime.utc(2021, 1, 1),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: _focusedDay,
            selectedDayPredicate: (day) =>
                isSameDay(_selectedDay, day), // ใช้ isSameDay สำหรับเลือกวัน
            calendarFormat: _calendarFormat,
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
            },
            eventLoader: (day) {
              return _events[day] ?? [];
            },
            // Add your styling here if needed
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _events[_selectedDay] != null
                  ? _events[_selectedDay]!.length
                  : 0,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(_events[_selectedDay]![index].toString()),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          _addEvent(); // Function to add an event
        },
      ),
    );
  }

  void _addEvent() {
    showDialog(
      context: context,
      builder: (context) {
        TextEditingController _eventController = TextEditingController();
        return AlertDialog(
          title: Text('Add Event'),
          content: TextField(
            controller: _eventController,
            decoration: InputDecoration(labelText: 'Event'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                if (_eventController.text.isNotEmpty) {
                  setState(() {
                    if (_events[_selectedDay] != null) {
                      _events[_selectedDay]!.add(_eventController.text);
                    } else {
                      _events[_selectedDay] = [_eventController.text];
                    }
                  });
                  _eventController.clear();
                  Navigator.pop(context);
                }
              },
              child: Text('Save'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Cancel'),
            ),
          ],
        );
      },
    );
  }
}
