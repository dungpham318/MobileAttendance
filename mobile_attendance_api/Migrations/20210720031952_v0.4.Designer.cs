﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using mobile_attendance_api.Data;

namespace mobile_attendance_api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210720031952_v0.4")]
    partial class v04
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("mobile_attendance_api.Models.Attendance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CheckinTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("CheckoutTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("SessionID")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("SubID")
                        .HasColumnType("integer");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("integer");

                    b.Property<int>("TermID")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TermID");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Device", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("LecID")
                        .HasColumnType("integer");

                    b.Property<int?>("LectureId")
                        .HasColumnType("integer");

                    b.Property<string>("OS")
                        .HasColumnType("text");

                    b.Property<bool>("Status")
                        .HasColumnType("boolean");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LectureId");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Lecture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("EmailToken")
                        .HasColumnType("text");

                    b.Property<string>("GoogleId")
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .HasColumnType("text");

                    b.Property<bool?>("IsAdmin")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Lectures");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("LecID")
                        .HasColumnType("integer");

                    b.Property<int?>("LectureId")
                        .HasColumnType("integer");

                    b.Property<string>("NotificationBody")
                        .HasColumnType("text");

                    b.Property<string>("NotificationTitle")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LectureId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("MACAddress")
                        .HasColumnType("text");

                    b.Property<string>("QRCode")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("AttendanceId")
                        .HasColumnType("integer");

                    b.Property<int>("CourseID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("LecID")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("RoomID")
                        .HasColumnType("integer");

                    b.Property<int>("SessionStatus")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("AttendanceId");

                    b.HasIndex("RoomID");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Term", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Terms");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Course", b =>
                {
                    b.HasOne("mobile_attendance_api.Models.Subject", null)
                        .WithMany("Courses")
                        .HasForeignKey("SubjectId");

                    b.HasOne("mobile_attendance_api.Models.Term", null)
                        .WithMany("Courses")
                        .HasForeignKey("TermID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Device", b =>
                {
                    b.HasOne("mobile_attendance_api.Models.Lecture", null)
                        .WithMany("Devices")
                        .HasForeignKey("LectureId");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Notification", b =>
                {
                    b.HasOne("mobile_attendance_api.Models.Lecture", null)
                        .WithMany("Notifications")
                        .HasForeignKey("LectureId");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Session", b =>
                {
                    b.HasOne("mobile_attendance_api.Models.Attendance", null)
                        .WithMany("Sessions")
                        .HasForeignKey("AttendanceId");

                    b.HasOne("mobile_attendance_api.Models.Room", null)
                        .WithMany("Sessions")
                        .HasForeignKey("RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Attendance", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Lecture", b =>
                {
                    b.Navigation("Devices");

                    b.Navigation("Notifications");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Room", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Subject", b =>
                {
                    b.Navigation("Courses");
                });

            modelBuilder.Entity("mobile_attendance_api.Models.Term", b =>
                {
                    b.Navigation("Courses");
                });
#pragma warning restore 612, 618
        }
    }
}
