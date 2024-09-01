import { Fragment } from "react"
import Link from "next/link"
import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import Logo from "./icons/Logo"
import SignOut from "./sign-out"
import isUserLoggedIn from "@/utils/supabase/is-logged-in"

const items: NavItem[] = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

export async function Navbar() {
  const isLoggedIn = isUserLoggedIn()

  return (
    <header className="sticky z-10 bg-background left-0 bottom-0 top-10 flex items-center justify-between gap-10 max-w-[900px] mx-auto px-3 pl-5 py-2.5 border rounded-[30px] mt-5">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-6">
        {items.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-secondary hover:text-white transition-colors",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
      <div className="flex items-center gap-2">
        {!isLoggedIn && (
          <Fragment>
            <Link href="/auth/sign-in" className={buttonVariants({ variant: "secondary" })}>
              Sign In
            </Link>
            <Link href="/welcome" className={buttonVariants()}>
              Sign Up - It's Free
            </Link>
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
              Dashboard
            </Link>
            <SignOut>
              Sign Out
            </SignOut>
          </Fragment>
        )}
      </div>
    </header>
  )
}
