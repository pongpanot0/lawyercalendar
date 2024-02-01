import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:lawyerapp/page/Mainscreen.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey.shade900,
        title: Text('Notifications'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => Mainscreen(data:'ok')),
            );
          },
        ),
      ),
      body: ListView(
        children: <Widget>[
          _buildNotificationGroup('ยังไม่ได้อ่าน', context),
          _buildNotificationGroup('อ่านแล้ว', context),
          _buildNotificationGroup('เมื่อวาน', context),
        ],
      ),
    );
    ;
  }

  Widget _buildNotificationGroup(String title, BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Card(
            elevation: 4, // กำหนดความสูงของเงา
            child: Container(
              margin: EdgeInsets.symmetric(
                  vertical: 8.0,
                  horizontal: 10.0), // เพิ่มความสูงด้านบนและด้านล่างของ Card
              width: MediaQuery.of(context).size.width,
              child: Text(
                title,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ),
        _buildNotificationItem(context),
        _buildNotificationItem(context),
        _buildNotificationItem(context),
      ],
    );
  }

  Widget _buildNotificationItem(BuildContext context) {
    return ListTile(
      title: Text('Notification Title'),
      subtitle: Text('Notification Message'),
      trailing: Icon(Icons.notifications),
      onTap: () {
        // Handle notification tap
      },
    );
  }
}
