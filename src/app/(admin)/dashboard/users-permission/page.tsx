"use client";

import { useState } from "react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  Search,
  Shield,
  MoreVertical,
  Trash2,
  Mail,
  UserCheck,
  ShieldAlert,
  Admin,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Editor" | "Support";
  status: "Active" | "Pending";
  joinedDate: string;
  avatar: string;
}

const UsersPermissionsPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Ahsan Habib",
      email: "ahsan.habib@example.com",
      role: "Admin",
      status: "Active",
      joinedDate: "2024-01-10",
      avatar: "AH",
    },
    {
      id: "2",
      name: "Mehnaz Anjum",
      email: "mehnaz.a@example.com",
      role: "Manager",
      status: "Active",
      joinedDate: "2024-02-14",
      avatar: "MA",
    },
    {
      id: "3",
      name: "Sabbir Rahman",
      email: "sabbir.r@example.com",
      role: "Editor",
      status: "Active",
      joinedDate: "2025-05-20",
      avatar: "SR",
    },
    {
      id: "4",
      name: "Jannatul Ferdous",
      email: "jannat.f@example.com",
      role: "Support",
      status: "Pending",
      joinedDate: "2026-07-12",
      avatar: "JF",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ name: "", email: "", role: "Editor" as TeamMember["role"] });

  // সার্চ লজিক (নাম এবং ইমেইল দুটোই কাজ করবে)
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (id: string, newRole: TeamMember["role"]) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.name || !inviteData.email) return;

    const initials = inviteData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      status: "Pending",
      joinedDate: new Date().toISOString().split("T")[0],
      avatar: initials || "U",
    };

    setMembers([newMember, ...members]);
    setInviteData({ name: "", email: "", role: "Editor" });
    setShowInviteModal(false);
  };

  const getRoleBadgeColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "Admin":
        return "bg-red-50 text-red-700 border-red-200";
      case "Manager":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Editor":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Support":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "";
    }
  };

  return (
    <div>
      {/* Header Section */}
      <AnimationContainer
        variant="fade-down"
        className="sticky top-0 z-50 pt-5 pb-3 bg-white backdrop-blur-sm border-b"
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-teal-600" /> Users & Permissions
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage team access levels, roles, and invite new administrators.
              </p>
            </div>

            <div>
              <Button variant="btnTeal" onClick={() => setShowInviteModal(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
          </div>
        </Container>
      </AnimationContainer>

      <Container>
        <div className="space-y-6 mt-6">
          {/* Search Bar control */}
          <AnimationContainer variant="fade-up" delay={0.1}>
            <Card className="border rounded-xl">
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimationContainer>

          {/* Members Table */}
          <AnimationContainer variant="fade-up" delay={0.2}>
            <Card className="border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Information</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-teal-50 text-teal-800 font-semibold rounded-full flex items-center justify-center text-sm border border-teal-100">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            member.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.joinedDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Manage Roles</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem onClick={() => handleRoleChange(member.id, "Admin")}>
                              <ShieldAlert className="h-4 w-4 mr-2 text-red-600" /> Set as Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(member.id, "Manager")}>
                              <Shield className="h-4 w-4 mr-2 text-blue-600" /> Set as Manager
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(member.id, "Editor")}>
                              <UserCheck className="h-4 w-4 mr-2 text-amber-600" /> Set as Editor
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(member.id, "Support")}>
                              <Users className="h-4 w-4 mr-2 text-purple-600" /> Set as Support
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Revoke Access
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke Team Access?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {member.name}? They will immediately lose access to this store dashboard.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteMember(member.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Remove User
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </AnimationContainer>

          {/* Invite User Custom Modal UI */}
          {showInviteModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <AnimationContainer variant="fade-up">
                <Card className="w-full max-w-md bg-white border rounded-xl shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-teal-600" /> Send Team Invitation
                      </h3>
                      <button
                        onClick={() => setShowInviteModal(false)}
                        className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleInviteSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">Full Name</label>
                        <Input
                          placeholder="e.g. Asif Iqbal"
                          value={inviteData.name}
                          onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="asif@company.com"
                            className="pl-9"
                            value={inviteData.email}
                            onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                            required
                        />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">Assign Role</label>
                        <select
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={inviteData.role}
                          onChange={(e) =>
                            setInviteData({ ...inviteData, role: e.target.value as TeamMember["role"] })
                          }
                        >
                          <option value="Admin">Admin (Full Access)</option>
                          <option value="Manager">Manager (Operations)</option>
                          <option value="Editor">Editor (Content & Products)</option>
                          <option value="Support">Support (Orders & Chat)</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowInviteModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant="btnTeal">
                          Send Invite
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </AnimationContainer>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default UsersPermissionsPage;