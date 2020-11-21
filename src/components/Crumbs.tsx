import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Breadcrumbs, Link, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

interface Crumb {
   href: string;
   label: string;
   active: boolean;
}

class CrumbsState {
   crumbs: Crumb[] = [];
   constructor() {
      makeObservable(this, {
         crumbs: observable,
         push: action,
         pop: action,
         reset: action,
         resetWith: action,
      });
   }

   push(crumb: Crumb): void {
      this.crumbs = [...this.crumbs, crumb];
   }
   pop(): void {
      this.crumbs = this.crumbs.slice(0, -1);
   }

   reset(): void {
      this.crumbs = [];
   }
   resetWith(crumbs: Crumb[]): void {
      this.crumbs = crumbs;
   }
}

export const crumbsState = new CrumbsState();
const Context = React.createContext<CrumbsState>(crumbsState);

export function useCrumbs(): CrumbsState {
   const value = React.useContext(Context);
   if (value === null) {
      throw new Error('no value provided');
   }
   return value;
}

const Crumbs: React.FC = React.memo(
   observer(() => {
      const { crumbs } = crumbsState;
      return (
         <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map((crumb) => {
               if (!crumb.active) {
                  return (
                     <Link key={crumb.href} href={crumb.href} color="textSecondary">
                        {crumb.label}
                     </Link>
                  );
               }
               return <Typography key={crumb.href}>{crumb.label}</Typography>;
            })}
         </Breadcrumbs>
      );
   }),
);
export default Crumbs;
