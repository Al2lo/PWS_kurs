import { FC, useEffect, useState } from "react";
import "../../styles/UserAdminPage.css";
import { AdminUsers } from "../../models/models";
import { UserService } from "../../Services/UserService";
import { toast } from "react-toastify";

const UsersAdminPage: FC = () => {
  const [users, setUsers] = useState<AdminUsers[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAllUsers = async () => {
    setIsLoading(true)
    try {
      const data = await UserService.GetAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Error loading users");
    }
    finally
    {
      setIsLoading(false)
    }
  };

  const handleBlock = (id: number, block:boolean) => {
    UserService.BlockUser(id, block)
      .then(() => {
        setIsUpdate(!isUpdate);
        toast.success("User blocked/unblocked successfully");
      })
      .catch(() => {
        toast.error("Error blocking/unblocking user");
      });
  };

  const handleDelete = (id: number) => {
    UserService.DeleteUser(id)
      .then(() => {
        setIsUpdate(!isUpdate);
        toast.success("User deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting user");
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, [isUpdate]);

  return (
    <div className="users-admin">
      <div className="users-admin__container">
        <h2 className="users-admin__header">Admin Users</h2>
        {isLoading ? ( 
          <div className="loading-indicator">Loading...</div> 
        ) : (
        <ul className="users-admin__list">
          {users.map((user) => (
            <li key={user.id} className="users-admin__list-item">
              <h3 className="users-admin__list-item-name">{user.name}</h3>
              <p className="users-admin__list-item-email">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="users-admin__list-item-status">
                <strong>Blocked:</strong> {user.isBlock ? "Yes" : "No"}
              </p>
              <div className="users-admin__buttons-container">
                <button
                  onClick={user.isBlock ? () => handleBlock(user.id, false) : () => handleBlock(user.id, true)}
                  className={`users-admin__block-button ${
                    user.isBlock ? "unblock" : "block"
                  }`}
                >
                  {user.isBlock ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="users-admin__delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default UsersAdminPage;
