import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-[80px] container">
            <div className="grid grid-cols-4 gap-20">
                <FooterList>
                    <FooterListTitle>Company</FooterListTitle>
                    <FooterListGroup>
                        <FooterListItem href="/">Opus Clip</FooterListItem>
                        <FooterListItem href="/">Opus Studio</FooterListItem>
                        <FooterListItem href="/">Blog</FooterListItem>
                        <FooterListItem href="/">About Us</FooterListItem>
                    </FooterListGroup>
                </FooterList>
                <FooterList>
                    <FooterListTitle>Alternative To</FooterListTitle>
                    <FooterListGroup>
                        <FooterListItem href="/">Munch alternative</FooterListItem>
                        <FooterListItem href="/">Vidyo.io alternative</FooterListItem>
                        <FooterListItem href="/">Chopcast alternative</FooterListItem>
                        <FooterListItem href="/">Repurpose.io alternative</FooterListItem>
                        <FooterListItem href="/">Descript alternative</FooterListItem>
                        <FooterListItem href="/">Crossclip alternative</FooterListItem>
                        <FooterListItem href="/">SuperCreator alternative</FooterListItem>
                    </FooterListGroup>
                </FooterList>
                <FooterList>
                    <FooterListTitle>Best Practices</FooterListTitle>
                    <FooterListGroup>
                        <FooterListItem href="/">How to turn long videos into viral shorts: the ultimate guide 2023</FooterListItem>
                        <FooterListItem href="/">Create videos in Alex Hormozi style: The ultimate guide</FooterListItem>
                        <FooterListItem href="/">How does Opus Clip work</FooterListItem>
                    </FooterListGroup>
                </FooterList>
                <FooterList>
                    <FooterListTitle>Trust and Legal</FooterListTitle>
                    <FooterListGroup>
                        <FooterListItem href="/">Terms and Conditions</FooterListItem>
                        <FooterListItem href="/">Privacy Policy</FooterListItem>
                        <FooterListItem href="/">Cookie Preferences</FooterListItem>
                        <FooterListItem href="/">Contact Us</FooterListItem>
                    </FooterListGroup>
                </FooterList>
            </div>
            <hr className="my-8"/>
            <div className="flex items-center justify-between gap-10">
                <p className="text-secondary">@2024 OpusClip. All rights Reserved.</p>
                <div className="flex items-center gap-3">
                    <SocialLink>
                        <Youtube size={30} className="text-white" />
                    </SocialLink>
                    <SocialLink>
                        <Instagram size={30} className="text-white" />
                    </SocialLink>
                    <SocialLink>
                        <Twitter size={30} className="fill-white stroke-none" />
                    </SocialLink>
                    <SocialLink>
                        <Linkedin size={30} className="fill-white stroke-none" />
                    </SocialLink>
                </div>
            </div>
        </footer>
    )
}

interface SocialLinkProps {
    children: React.ReactNode;
}

function SocialLink({ children }: SocialLinkProps) {
    return (
        <a className="text-secondary hover:text-primary transition-colors p-3 rounded-full border" href="https://www.youtube.com/channel/UCv0t7T3J6VY6f7T3d8ZQ9aA">
            {children}
        </a>
    )
}

interface FooterListProps {
    children: React.ReactNode;
}

function FooterList({ children }: FooterListProps) {
    return (
        <div className="flex flex-col gap-6">
            {children}
        </div>
    )
}

interface FooterListTitle {
    children: React.ReactNode;
}

function FooterListTitle({ children }: FooterListTitle) {
    return (
        <h4>{children}</h4>
    )
}

interface FooterListGroupProps {
    children: React.ReactNode;
}

function FooterListGroup({ children }: FooterListGroupProps) {
    return (
        <div className="flex flex-col gap-3">
            {children}
        </div>
    )
}

interface FooterListItemProps {
    children: React.ReactNode;
}

function FooterListItem({ children, ...props }: FooterListItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <Link className="text-secondary hover:text-primary transition-colors" {...props}>
            {children}
        </Link>
    )
}