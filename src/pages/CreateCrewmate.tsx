import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, CrewmateCreate } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import CrewmateForm from "@/components/CrewmateForm";

const CreateCrewmate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CrewmateCreate) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `${data.name} has been created and is ready for space missions!`,
      });

      navigate("/gallery");
    } catch (error) {
      console.error('Error creating crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to create crewmate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/gallery");
  };

  return (
    <div className="min-h-screen space-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <CrewmateForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateCrewmate;