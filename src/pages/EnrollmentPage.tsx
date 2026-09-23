import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments,
} from "@/lib/mock-data";

export default function Enrollment() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(
    currentStudent.courses ?? []
  );

  function handleRegister(courseId: string) {
    setEnrolledCourseIds((prev) => {
      // ป้องกันการลงทะเบียนซ้ำ
      if (prev.includes(courseId)) {
        return prev;
      }

      return [...prev, courseId];
    });
  }

  function handleUnregister(courseId: string) {
    setEnrolledCourseIds((prev) =>
      prev.filter((id) => id !== courseId)
    );
  }

  function getEnrolledAt(courseId: string) {
    return enrollments.find(
      (enrollment) =>
        enrollment.studentId === currentStudent.studentId &&
        enrollment.courseId === courseId
    )?.enrolledAt;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            รายวิชาทั้งหมด
          </h1>
        </div>

        <RegisterDialog
          enrolledCourseIds={enrolledCourseIds}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(
            course.courseId
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={isEnrolled}
              enrolledAt={getEnrolledAt(course.courseId)}
              onUnregister={handleUnregister}
            />
          );
        })}
      </div>
    </div>
  );
}