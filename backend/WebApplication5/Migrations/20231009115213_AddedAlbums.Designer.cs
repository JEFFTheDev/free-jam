﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication5;

#nullable disable

namespace WebApplication5.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231009115213_AddedAlbums")]
    partial class AddedAlbums
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebApplication5.Entities.Album", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Artist")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Released")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("WebApplication5.Entities.ChordChange", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("AtMilliseconds")
                        .HasColumnType("bigint");

                    b.Property<long>("ChordId")
                        .HasColumnType("bigint");

                    b.Property<long>("Duration")
                        .HasColumnType("bigint");

                    b.Property<long?>("SongProfileId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ChordId");

                    b.HasIndex("SongProfileId");

                    b.ToTable("ChordChange");
                });

            modelBuilder.Entity("WebApplication5.Entities.GuitarChord", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Shape")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Variant")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("GuitarChords");
                });

            modelBuilder.Entity("WebApplication5.Entities.Song", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long?>("AlbumId")
                        .HasColumnType("bigint");

                    b.Property<string>("Artist")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tuning")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VideoId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("WebApplication5.Entities.SongProfile", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("SongId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("SongId");

                    b.ToTable("SongProfiles");
                });

            modelBuilder.Entity("WebApplication5.Entities.ChordChange", b =>
                {
                    b.HasOne("WebApplication5.Entities.GuitarChord", "Chord")
                        .WithMany()
                        .HasForeignKey("ChordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication5.Entities.SongProfile", null)
                        .WithMany("Changes")
                        .HasForeignKey("SongProfileId");

                    b.Navigation("Chord");
                });

            modelBuilder.Entity("WebApplication5.Entities.Song", b =>
                {
                    b.HasOne("WebApplication5.Entities.Album", "Album")
                        .WithMany()
                        .HasForeignKey("AlbumId");

                    b.Navigation("Album");
                });

            modelBuilder.Entity("WebApplication5.Entities.SongProfile", b =>
                {
                    b.HasOne("WebApplication5.Entities.Song", "Song")
                        .WithMany()
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("WebApplication5.Entities.SongProfile", b =>
                {
                    b.Navigation("Changes");
                });
#pragma warning restore 612, 618
        }
    }
}
