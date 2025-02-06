import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  filteredUsers: User[] = [];
  searchTerm: string = '';
  newUser: User = {
    userName: '',
    email: '',
    password: ''
  };
  newRole: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    }, error => {
      console.error('Error loading users', error);
    });
  }

  viewUser(email: string): void {
    if (email !== undefined) {
      this.userService.getUserByEmail(email).subscribe((user) => {
        console.log('Loaded user:', user);
        this.selectedUser = user;
      }, error => {
        console.error('Error loading user', error);
      });
    }
  }

  addUser(newUser: User): void {
    console.log('Adding user:', newUser);
    this.userService.addUser(newUser).subscribe((user) => {
      console.log('Added user:', user);
      this.users.push(user);
      this.newUser = { userName: '', email: '', password: '' };
    }, error => {
      console.error('Error adding user', error);
    });
  }

  updateUser(user: User): void {
    if (!user.email) return;

    console.log('Updating user:', user);
    this.userService.updateUser(user).subscribe(() => {
      console.log('Updated user:', user);
      this.loadUsers();
    }, error => {
      console.error('Error updating user', error);
    });
  }

  deleteUser(email: string): void {
    if (email !== undefined && confirm("Are you sure to delete " + email)) {
      console.log('Deleting user with email:', email);
      this.userService.deleteUser(email).subscribe(() => {
        console.log('Deleted user with email:', email);
        this.users = this.users.filter(p => p.email !== email);
        this.loadUsers();
      }, error => {
        console.error('Error deleting user', error);
      });
    }
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    this.userService.updateUser(user).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error updating user', err);
      },
    });
  }

  filterProjects(): void {
    if (this.searchTerm === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addRoleToUser(email: string, role: string): void {
    this.userService.addRoleToUser(email, role).subscribe(() => {
      console.log(`Added role ${role} to user ${email}`);
    }, error => {
      console.error('Error adding role to user', error);
    });
  }

  removeRoleFromUser(email: string, role: string): void {
    this.userService.removeRoleFromUser(email, role).subscribe(() => {
      console.log(`Removed role ${role} from user ${email}`);
    }, error => {
      console.error('Error removing role from user', error);
    });
  }
}
