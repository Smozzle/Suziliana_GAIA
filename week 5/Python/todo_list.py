todos = []
completed_tasks = []

# Add initial tasks
todos.append("Learn Python")
todos.append("Practice coding")
todos.append("Take a break")


def display_lists():
    """Display both to-do and completed task lists with counts"""

    print("\n--- To-Do List ---")

    if not todos:
        print("No tasks yet.")
    else:
        for index, task in enumerate(todos, 1):
            print(f"{index}. {task}")

    print(f"Total pending tasks: {len(todos)}")

    print("\n--- Completed Tasks ---")

    if not completed_tasks:
        print("No completed tasks yet.")
    else:
        for index, task in enumerate(completed_tasks, 1):
            print(f"{index}. {task}")

    print(f"Total completed tasks: {len(completed_tasks)}")


def add_task():
    """Ask user for a new task and add it to the to-do list"""

    task = input("Enter a new task: ")
    todos.append(task)

    print("Task added successfully!")


def complete_task():
    """Mark a task as complete and move it to the completed list"""

    if not todos:
        print("No tasks to complete.")
        return

    for index, task in enumerate(todos, 1):
        print(f"{index}. {task}")

    try:
        number = int(input("Enter the number of the task you completed: "))
        index = number - 1

        if index >= 0 and index < len(todos):
            task = todos.pop(index)
            completed_tasks.append(task)

            print(f"'{task}' marked as completed!")
        else:
            print("Invalid task number.")

    except ValueError:
        print("Please enter a valid number.")


# Main program loop
running = True

while running:

    print("\n======================")
    print("       TO-DO LIST")
    print("======================")
    print("1. Display tasks")
    print("2. Add task")
    print("3. Complete task")
    print("4. Exit")
    print("======================")

    choice = input("Choose an option: ")

    if choice == "1":
        display_lists()

    elif choice == "2":
        add_task()

    elif choice == "3":
        complete_task()

    elif choice == "4":
        print("Goodbye!")
        running = False

    else:
        print("Invalid option. Please try again.")