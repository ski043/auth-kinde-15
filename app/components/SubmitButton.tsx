"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full mt-4">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
        </Button>
      ) : (
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      )}
    </>
  );
}
