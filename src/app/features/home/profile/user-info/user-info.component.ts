import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserDto } from '../../../../../apiResponsesType/UserData';



@Component({
  selector: 'app-user-info',
  standalone: true,
  templateUrl: './user-info.component.html',
  imports: [CommonModule]
})
export class UserInfoComponent {
  @Input() user!: UserDto;
}

