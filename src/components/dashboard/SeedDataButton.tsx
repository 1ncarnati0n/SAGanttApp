/**
 * SeedDataButton Component
 * 샘플 데이터 생성 버튼
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Database, Check } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export function SeedDataButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      const response = await axios.post("/api/seed");
      
      if (response.data.success) {
        toast.success("샘플 프로젝트가 생성되었습니다!");
        setIsSeeded(true);
        
        // Reload page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Seed error:", error);
      toast.error("샘플 데이터 생성 실패");
    } finally {
      setIsSeeding(false);
    }
  };

  if (isSeeded) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Check className="h-4 w-4 mr-2" />
        생성 완료
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSeed}
      loading={isSeeding}
      disabled={isSeeding}
    >
      <Database className="h-4 w-4 mr-2" />
      샘플 프로젝트 생성
    </Button>
  );
}

