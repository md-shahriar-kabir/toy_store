import { TypingText } from "@/components/ui/typing-text";
import Container from "../container/Container";
import diamondBg from "../../../../public/background/diamonds2.png";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Truck, LogOut, Mail, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
  return (
    <div className="bg-[#006769] hidden sm:block relative">
      <Container>
        <div className="flex justify-between py-1 -mb-2">

          {/* typing Message */}
          <div className=" text-white flex items-center gap-2">
            <Truck size={20} />
            <TypingText
              texts={[
                "Welcome to our platform",
                "Get free home delivery (Order More then ৳1000+) | 📧 support@toyshop.com",
                "20% off on your first order!",
              ]}
              className="text-sm font-semibold"
              speed={100}
              loop={true}
              pauseDuration={1500}
              showCursor={true}
              cursor="|"
              cursorClassName="font-bold text-white"
            />
          </div>

          {/* Account Button */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="btnGhost">My Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {/* Account Section */}
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail />
                    <span>Inbox</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {/* Logout */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>

      {/* Diamond Background */}
      <Marquee
        className="absolute top-2"
        autoFill={true}
        speed={10}
        direction="right"
      >
        <Image src={diamondBg} alt="diamonds" width={40} />
      </Marquee>
    </div>
  );
};

export default TopBar;
