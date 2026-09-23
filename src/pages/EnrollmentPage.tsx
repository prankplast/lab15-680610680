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

  const [enrolledTimes, setEnrolledTimes] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};

    enrollments
      .filter(
        (enrollment) =>
          enrollment.studentId === currentStudent.studentId
      )
      .forEach((enrollment) => {
        initial[enrollment.courseId] =
          enrollment.enrolledAt ?? "";
      });

    return initial;
  });

  function handleRegister(courseId: string, time: string) {
    setEnrolledCourseIds((prev) => [...prev, courseId]);

    setEnrolledTimes((prev) => ({
      ...prev,
      [courseId]: time,
    }));
  }

  function handleUnregister(courseId: string) {
    setEnrolledCourseIds((prev) =>
      prev.filter((id) => id !== courseId)
    );

    setEnrolledTimes((prev) => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
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
              enrolledAt={enrolledTimes[course.courseId]}
              onUnregister={handleUnregister}
            />
          );
        })}
      </div>
    </div>
  );
}