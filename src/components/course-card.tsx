import type { Course, Student } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnregister: (courseId: string) => void;
};

function formatEnrolledAt(enrolledAt?: string) {
  if (!enrolledAt) return "-";

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(enrolledAt));
}

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnregister,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="relative">
        {/* Badge */}
        <span
          className={
            isEnrolled
              ? "absolute right-6 top-6 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-purple-900 dark:text-purple-100"
              : "absolute right-6 top-6 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-amber-900 dark:text-amber-100"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </span>

        <CardTitle className="pr-32 text-base">
          {course.courseTitle}
        </CardTitle>

        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
          {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>

            <p>โปรแกรม: {student.program}</p>

            <p>
              ลงทะเบียนเมื่อ: {formatEnrolledAt(enrolledAt)}
            </p>
          </div>

          {/* 1.3 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUnregister(course.courseId)}
            aria-label="ยกเลิกการลงทะเบียน"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}