import React from 'react'
import { Input } from '../ui/input';
import UserMenu from './sidemenu/UserMenu';
import GeneralLinks from './sidemenu/GeneralLinks';
import { Search } from 'lucide-react';

export default function Sidemenu() {
  return (
    <nav className="flex flex-col gap-4 px-5 py-1">
      <UserMenu />
      <SearchInput />
      <GeneralLinks />
    </nav>
  )
}

function SearchInput() {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className="h-9"
      icon={<Search size={20} className="text-secondary" />}
    />
  )
}