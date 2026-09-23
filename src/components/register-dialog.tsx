import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Course } from "@/lib/types";
import { courses, currentStudent } from "@/lib/mock-data";

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

interface RegisterDialogProps {
  enrolledCourseIds: string[];
  onRegister: (courseId: string, time: string) => void;
}

export function RegisterDialog({
  enrolledCourseIds,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [time, setTime] = useState(getCurrentTime());

  const availableCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.courseId)
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedCourse) return;

    const now = new Date();
    const [hours, minutes] = time.split(":");

    now.setHours(Number(hours));
    now.setMinutes(Number(minutes));
    now.setSeconds(0);
    now.setMilliseconds(0);

    onRegister(selectedCourse.courseId, now.toISOString());

    setSelectedCourse(null);
    setTime(getCurrentTime());
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button">ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อลงทะเบียน
            </DialogDescription>
          </DialogHeader>

          {/* วิชา */}
          <div className="space-y-2">
            <Label htmlFor="course">วิชา</Label>

            <select
              id="course"
              value={selectedCourse?.courseId ?? ""}
              onChange={(e) => {
                const course = availableCourses.find(
                  (course) => course.courseId === e.target.value
                );

                setSelectedCourse(course ?? null);
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="" disabled>
                เลือกวิชา
              </option>

              {availableCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseId} – {course.courseTitle}
                </option>
              ))}
            </select>

            {availableCourses.length === 0 && (
              <p className="text-sm text-muted-foreground">
                ไม่มีวิชาที่สามารถลงทะเบียนได้
              </p>
            )}
          </div>

          {/* เวลา */}
          <div className="space-y-2">
            <Label htmlFor="enrolledAt">เลือกเวลา</Label>

            <Input
              id="enrolledAt"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* ชื่อนักศึกษา */}
          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>

            <Input
              id="studentName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          {/* โปรแกรม */}
          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>

            <Input
              id="program"
              value={currentStudent.program}
              readOnly
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedCourse}
            >
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}