import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RoleSelect } from './role-select/role-select';
import { RoleSelect2 } from './role-select2/role-select2';
import { About } from './about/about';
import { Privacy } from './privacy/privacy';
import { Terms } from './terms/terms';
import { Contact } from './contact/contact';
import { ForgotPassword } from './forgot-password/forgot-password';

import { StudentDashboard } from './student-dashboard/student-dashboard';
import { TeacherDashboard } from './teacher-dashboard/teacher-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

import { Quiz } from './pages/quiz/quiz';
import { ResultsComponent } from './results/results';
import { ResultDetailComponent } from './result-detail/result-detail';
import { History } from './pages/history/history';

import { CreateQuiz } from './create-quiz/create-quiz';
import { TeacherMyQuizzes } from './teacher-my-quizzes/teacher-my-quizzes';
import { TeacherEditQuiz } from './teacher-edit-quiz/teacher-edit-quiz';

import { AvailableQuizzes } from './available-quizzes/available-quizzes';
import { QuizOverview } from './quiz-overview/quiz-overview';
import { PlayQuiz } from './play-quiz/play-quiz';

import { Profile } from './profile/profile';
import { ClassesComponent } from './classes/classes';
import { ActivityComponent } from './activity/activity';

import { MainLayout } from './main-layout/main-layout';
import path from 'path/win32';

export const routes: Routes = [

  // ================= PUBLIC PAGES =================
  { path: '', component: Home },
  { path: 'select-role', component: RoleSelect },
  { path: 'select-role2', component: RoleSelect2 },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'about', component: About },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'contact', component: Contact },
  { path: 'forgot-password', component: ForgotPassword },

  // ================= TEACHER / ADMIN =================
  { path: 'teacher-dashboard', component: TeacherDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },

  // ================= STUDENT SECTION (WITH NAVBAR LAYOUT) =================
  {
    path: '',
    component: MainLayout,
    children: [

      { path: 'student-dashboard', component: StudentDashboard },
      { path: 'profile', component: Profile },
      { path: 'activity', component: ActivityComponent },
      { path: 'classes', component: ClassesComponent },

      { path: 'student/quizzes', component: AvailableQuizzes },
      { path: 'student/quiz/:quizId/overview', component: QuizOverview },
      { path: 'student/quiz/:quizId/play', component: PlayQuiz },

      { path: 'history', component: History },
      { path: 'results', component: ResultsComponent },
      { path: 'results/:quizId', component: ResultDetailComponent },
      {path: 'student/attempt-review/:attemptId',
  loadComponent: () =>
    import('./attempt-review/attempt-review')
      .then(m => m.AttemptReview) }

    ]
  },

  // ================= GENERAL =================
  { path: 'create-quiz', component: CreateQuiz },
  { path: 'quiz', component: Quiz },

  // ================= TEACHER QUIZZES =================
  { path: 'teacher-quizzes', component: TeacherMyQuizzes },
  { path: 'teacher/quizzes/:quizId/edit', component: TeacherEditQuiz },
  { path: 'teacher/quizzes/:quizId/view', component: TeacherEditQuiz },

  // ================= FALLBACK =================
  { path: '**', redirectTo: 'login' }

];