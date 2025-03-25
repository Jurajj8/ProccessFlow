import { Component, inject, OnInit } from '@angular/core';
import { SecurityService } from '../security/security-service';
import { UserCredentials } from '../security/security.models';
import { User, UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {
    userName: '',
    password: '',
    email: '',
    profileImagePath: ''
  };
  selectedFile: File | null = null;

  securityService = inject(SecurityService);

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCredentials();
    this.loadUserProfile();
    this.checkAdmin();
  }

  getCredentials() {
    this.user.userName = this.securityService.getUsername();
    this.user.email = this.securityService.getJWTClaim('email');
  }

  loadUserProfile() {
    this.userService.getUserByEmail(this.user.email).subscribe((user: any) => {
      this.user.userName = user.userName;
      this.user.profileImagePath = user.imageId ? `https://localhost:7244/api/images/${user.imageId}` : '';
    }, error => {
      console.error('Error loading user profile', error);
      if (error.status === 401) {
        console.error('Unauthorized access - please check your credentials');
      }
    });
  }

  updateProfile(user: User): void {
    if (!user.email) return;

    this.userService.updateUser(user).subscribe(() => {
      console.log('Profile updated successfully');
    }, error => {
      console.error('Error updating profile', error);
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (file && allowedTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      alert('Only JPG and PNG files are allowed.');
      this.selectedFile = null;
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('email', this.user.email);

    this.http.post('https://localhost:7244/api/images/upload', formData).subscribe((response: any) => {
      console.log('Image uploaded successfully', response);
      this.user.profileImagePath = `https://localhost:7244/api/images/${response.filePath}`;
    }, error => {
      console.error('Error uploading image', error);
    });
  }

  deleteImage(): void {
    if (!this.user.profileImagePath) return;

    const imageId = this.user.profileImagePath.split('/').pop();
    this.http.delete(`https://localhost:7244/api/images/${imageId}`).subscribe(() => {
      console.log('Image deleted successfully');
      this.user.profileImagePath = '';
    }, error => {
      console.error('Error deleting image', error);
    });
  }
  checkAdmin(): void {
    if (this.securityService.getRoleAdmin()) {
      console.log('User is an admin');
    } else {
      console.log('User is not an admin');
    }
  }

  checkRoles(): string {
    const roles = this.securityService.getRoles().join();
    if (roles != null) {
      return roles;
    } else {
      return '';
    }
  }
}
