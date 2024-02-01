import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:lawyerapp/page/componnets/Apiservice.dart';

class Task {
  final int id;
  final String title;
  bool isCompleted;

  Task({required this.id, required this.title, this.isCompleted = false});
}

class TodoList extends StatefulWidget {
  final int case_timeline_id;
  final int CaseID;
  const TodoList(
      {Key? key, required this.case_timeline_id, required this.CaseID});

  @override
  State<TodoList> createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  List<Task> tasks = [];
  late Future<List<Task>> _tasksFuture;
  @override
  void initState() {
    super.initState();
    _tasksFuture = fetchData();
  }

  List<dynamic> apiData = [];

  Future<void> createtodolist(String taskController) async {
    try {
      var data = {
        "case_timeline_id": widget.case_timeline_id ?? 1,
        "case_id": widget.CaseID ?? 1,
        "case_todolist_name": taskController.toString()
      };

      print('Before apiService.createtodolist');

      final apiService = ApiService();

      var postResponse = await apiService.createtodolist(data);
      tasks.clear();
      _tasksFuture = fetchData();
    } catch (e) {
      print('Error: $e');
    }
  }

  Future<List<Task>> fetchData() async {
    final apiService = ApiService();
    apiData = await apiService.caseTodolist(widget.case_timeline_id);
    await Future.delayed(Duration(seconds: 2));

    tasks.addAll(apiData.map((taskData) {
      bool isCompleted = taskData['case_todolist_sucess'] == 1;
      print(isCompleted);
      return Task(
          id: taskData['case_todolist'] ?? "",
          title: taskData['case_todolist_name'] ?? "",
          isCompleted:  taskData['case_todolist_sucess'] == 1);
    }));

    return tasks;
  }

  @override
  void dispose() {
    _tasksFuture;
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("TODOLIST"),
        centerTitle: true,
        backgroundColor: Colors.grey.shade900,
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          _showAddTaskDialog();
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
            SizedBox(
              height: 10,
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "สิ่งที่ต้องทำ",
                    style: TextStyle(fontSize: 18),
                  ),
                 
                ],
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Expanded(
                child: FutureBuilder(
                    future: _tasksFuture,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // If the Future is still running, show a loading indicator
                        return Center(
                            child: CircularProgressIndicator.adaptive());
                      } else if (snapshot.hasError) {
                        // If the Future throws an error, show an error message
                        return Text('Error: ${snapshot.error}');
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // If the Future completes successfully but with no data, show a message
                        return Text('No tasks found.');
                      } else {
                        return ListView.builder(
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            return Card(
                              child: ListTile(
                                title: Text(snapshot.data![index].title),
                                trailing: Checkbox(
                                    value: snapshot.data![index]
                                        .isCompleted, // Check if isCompleted is 1
                                    onChanged: (value) async {
                                      try {
                                        var data = {
                                          "case_todolist":
                                              snapshot.data![index].id,
                                          "case_todolist_sucess":
                                              value! ? 1 : 0,
                                        };

                                        final apiService = ApiService();
                                        var postResponse =
                                            await apiService.updateTask(data);

                                        if (postResponse == 200) {
                                          // Update local state only if the API call is successful
                                          setState(() {
                                            snapshot.data![index].isCompleted =
                                                value!;
                                          });
                                        } else {
                                          print('Failed to update task');
                                        }
                                      } catch (e) {
                                        print('Exception: $e');
                                      }
                                    }),
                              ),
                            );
                          },
                        );
                      }
                    })),
          ],
        ),
      ),
    );
  }

  Future<void> _showAddTaskDialog() async {
    TextEditingController taskController = TextEditingController();
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Add a Task'),
          content: TextField(
            controller: taskController,
            decoration: InputDecoration(
              hintText: 'Enter your task...',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                await createtodolist(taskController.text ?? "");
                /* Navigator.pop(context); */
              },
              child: Text('Add'),
            ),
          ],
        );
      },
    );
  }
}
