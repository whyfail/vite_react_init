import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/shared/ui/field';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';
import { Separator } from './separator';
import { Spinner } from './spinner';

describe('shared ui components', () => {
  it('renders form primitives', () => {
    render(
      <div>
        <Button>Save</Button>
        <Input aria-label="Name" defaultValue="Ada" />
        <Checkbox aria-label="Remember" />
        <Label htmlFor="name">Name label</Label>
        <Separator />
        <Spinner />
      </div>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('Ada');
    expect(screen.getByLabelText('Remember')).toBeInTheDocument();
    expect(screen.getByText('Name label')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders field primitives', () => {
    render(
      <FieldSet>
        <FieldLegend>Account</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <FieldTitle>Primary email</FieldTitle>
              <FieldDescription>Used for notifications</FieldDescription>
              <FieldError>Required</FieldError>
            </FieldContent>
          </Field>
          <FieldSeparator>or</FieldSeparator>
        </FieldGroup>
      </FieldSet>,
    );

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Primary email')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('renders dialog primitives', () => {
    render(
      <Dialog open>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
          <DialogFooter>Dialog footer</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog title')).toBeInTheDocument();
    expect(screen.getByText('Dialog footer')).toBeInTheDocument();
  });
});
