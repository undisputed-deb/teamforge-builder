import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase, Crewmate, CrewmateCreate } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import CrewmateForm from "@/components/CrewmateForm";

const EditCrewmate = () => {
  const { id } = useParams<{ id: string }>();
  const [crewmate, setCrewmate] = useState<Crewmate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCrewmate(id);
    }
  }, [id]);

  const fetchCrewmate = async (crewmateId: string) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', crewmateId)
        .single();

      if (error) throw error;
      setCrewmate(data);
    } catch (error) {
      console.error('Error fetching crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to load crewmate details. Please try again.",
        variant: "destructive",
      });
      navigate("/gallery");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleSubmit = async (data: CrewmateCreate) => {
    if (!crewmate) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .update(data)
        .eq('id', crewmate.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `${data.name} has been updated successfully!`,
      });

      navigate(`/crewmate/${crewmate.id}`);
    } catch (error) {
      console.error('Error updating crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to update crewmate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (crewmate) {
      navigate(`/crewmate/${crewmate.id}`);
    } else {
      navigate("/gallery");
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen space-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Loading crewmate data...</div>
        </div>
      </div>
    );
  }

  if (!crewmate) {
    return (
      <div className="min-h-screen space-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Crewmate not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <CrewmateForm
          initialData={{
            name: crewmate.name,
            speed: crewmate.speed,
            color: crewmate.color,
            category: crewmate.category
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditCrewmate;